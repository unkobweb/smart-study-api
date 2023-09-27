import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, RawBodyRequest } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import Stripe from 'stripe';

@Controller('purchase')
export class PurchaseController {

  stripe: Stripe

  constructor(private readonly purchaseService: PurchaseService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET,{
      apiVersion: '2023-08-16',
    });
  }

  @Post('webhook')
  webhook(@Req() request) {
    let event = request.rawBody;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log({endpointSecret})
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = this.stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        throw new BadRequestException(`Webhook signature verification failed.`);
      }
    }

    switch (event.type) {
      case "checkout.session.completed":
        return this.purchaseService.handleCheckoutSessionCompleted(event.data.object);
    }

    return "OK"
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-checkout-session')
  createCheckoutSession(@Req() req, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createCheckoutSession(req.user, createPurchaseDto);
  }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':courseUuid')
  findAll(@Req() req, @Param('courseUuid') courseUuid: string) {
    return this.purchaseService.findUserCoursePurchase(courseUuid, req.user);
  }

}
