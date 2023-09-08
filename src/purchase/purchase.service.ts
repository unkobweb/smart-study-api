import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Course } from '../entities/course.entity';

@Injectable()
export class PurchaseService {

  stripe: Stripe

  constructor(
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET,{
      apiVersion: '2023-08-16',
    });
  }

  async handleCheckoutSessionCompleted(object) {
    await this.purchaseRepository.update({checkoutSessionId: object.id}, {completed: true})
    return "OK"
  }

  async findUserCoursePurchase(courseUuid, user) {
    return this.purchaseRepository.find({where: {user: {uuid: user.uuid}, course: {uuid: courseUuid}, completed: true}, relations: ['course']})
  }

  async createCheckoutSession(user, dto) {
    const course = await this.courseRepository.findOne({where: {uuid: dto.course}, relations: ['thumbnail']});

    const stripeCustomer = await this.stripe.customers.list({email: user.email});
    if (stripeCustomer.data.length === 0) {
      throw new NotFoundException('No stripe customer found')
    }
    const session = await this.stripe.checkout.sessions.create({
      customer: stripeCustomer.data[0].id,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Cours "${course.title}"`
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.WEB_URL}/course/${course.uuid}`,
      cancel_url: `${process.env.WEB_URL}/course/${course.uuid}`,
    })
    await this.purchaseRepository.save({
      user: {uuid: user.uuid},
      course: {uuid: course.uuid},
      amount: course.price,
      checkoutSessionId: session.id,
    })
    return session.url
  }

  create(createPurchaseDto: CreatePurchaseDto) {
    return 'This action adds a new purchase';
  }
}
