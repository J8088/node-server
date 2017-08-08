import mongoose from 'mongoose';

import { Address } from "../address/address.model";
/**
 * PaymentMethod Schema
 */

export const PaymentMethod = new mongoose.Schema({
  processor: {
    type: String
  },
  paymentPackageId: {
    type: String
  },
  paymentSettingsKey: {
    type: String
  },
  storedCard: {
    type: String,
    optional: true
  },
  method: {
    type: String,
    allowedValues: ["credit", "debit", "shipping-credit"],
    optional: true
  },
  transactionId: {
    type: String
  },
  metadata: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: String
  },
  mode: {
    type: String,
    allowedValues: ["authorize", "capture", "refund", "cancel", "void"]
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    },
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  authorization: {
    type: String,
    optional: true
  },
  amount: {
    type: Number,
    decimal: true,
    optional: true
  },
  currency: {
    type: String,
    optional: true
  },
  transactions: {
    type: [Object],
    optional: true,
    blackbox: true
  }
});

/**
 * Invoice Schema
 */

export const Invoice = new mongoose.Schema({
  transaction: {
    type: String,
    optional: true
  },
  shipping: {
    type: Number,
    decimal: true,
    optional: true
  },
  taxes: {
    type: Number,
    decimal: true,
    optional: true
  },
  subtotal: {
    type: Number,
    decimal: true
  },
  discounts: {
    type: Number,
    decimal: true,
    optional: true
  },
  total: {
    type: Number,
    decimal: true
  }
});

/**
 * Currency Schema
 */

export const Currency = new mongoose.Schema({
  userCurrency: {
    type: String,
    optional: true,
    defaultValue: "USD"
  },
  exchangeRate: {
    type: Number,
    decimal: true,
    optional: true
  }
});

/**
 * Payment Schema
 */

export const Payment = new mongoose.Schema({
  _id: {
    type: String,
    label: "Payment Id"
  },
  address: {
    type: Address,
    optional: true
  },
  paymentMethod: {
    type: PaymentMethod,
    optional: true
  },
  invoice: {
    type: Invoice,
    optional: true
  },
  currency: {
    type: Currency,
    optional: true
  }
});

export const Refund = new mongoose.Schema({
  type: {
    type: String
  },
  amount: {
    type: Number,
    decimal: true
  },
  created: {
    type: Number
  },
  currency: {
    type: String
  },
  raw: {
    type: Object,
    optional: true,
    blackbox: true
  }
});
