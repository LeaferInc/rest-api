import { Controller, OnModuleInit, Post, Body, Request, Logger, UseGuards, NotImplementedException } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController implements OnModuleInit {

  private readonly logger = new Logger(PaymentController.name); 

  private stripe: Stripe;

  constructor(
    private paymentService: PaymentService,
  ) {}

  async onModuleInit() {
    this.stripe = 
      new Stripe(
        "sk_test_51H2EBRFeBcGJPpInE0shrCm1ZYviR6GxN1UlqEyD7TprFWGDzMHmpVsaGS8rUELlPfhrE8OODzAKNTcIsh1pOGHM00v1nL8nTD",
        {
           apiVersion: "2020-03-02",
           typescript: true,
        }
      );
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPaymenIntent(@Request() request: Express.Request): Promise<{clientSecret: string}> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 500,
      currency: 'eur',
      metadata: { userId: request.user.userId },
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('webhook')
  async webhookPayment(@Body() body: any) {
    switch(body.type) {
      case 'charge.succeeded': {
        const userId = body.data.object.metadata.userId;
        await this.paymentService.webhookUpdateUser(userId);
        this.logger.log(`User ${userId} charge succeeded`);
        break;
      }
      default: {
        // Unexpected event type
        throw new NotImplementedException();
      }
    }

    return {received: true};
  }
}
