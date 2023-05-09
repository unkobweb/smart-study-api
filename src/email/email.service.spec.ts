import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';

const mockMailerService = {
  sendMail: jest.fn().mockResolvedValue({}),
};

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send email successfully', async () => {
    const to = 'test@example.com';
    const subject = 'Test email';
    const templateName = 'test';
    const context = { name: 'John Doe' };

    await emailService.sendEmail(to, subject, templateName, context);

    expect(mockMailerService.sendMail).toHaveBeenCalledTimes(1);
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to,
      subject,
      template: './confirmation',
      context,
    });
  });

  it('should send email successfully without context', async () => {
    const to = 'test@example.com'
    const subject = 'Test email';
    const templateName = 'test';

    await emailService.sendEmail(to, subject, templateName);

    expect(mockMailerService.sendMail).toHaveBeenCalledTimes(1);
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to,
      subject,
      template: './confirmation',
      context: {},
    });
  });
});