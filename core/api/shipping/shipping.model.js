import { Address } from "../address/address";
import { Invoice } from "../payment/payments";

/**
 * ShippoShippingMethod Schema
 * TODO move shippo related schema to shippo module
 * This will only exist in ShippingMethods Inside Cart/Order and not DB shipping Collection
 * as Shippo Methods are Dynamic.
 */

export const ShippoShippingMethod = new mongoose.Schema({
  serviceLevelToken: {
    type: String,
    optional: true
  },
  rateId: {
    type: String,
    optional: true
  }
});

/**
 * ShippingMethod Schema
 */

export const ShippingMethod = new mongoose.Schema({
  "_id": {
    type: String,
    label: "Shipment Method Id"
  },
  "name": {
    type: String,
    label: "Method Name"
  },
  "label": {
    type: String,
    label: "Public Label"
  },
  "group": {
    type: String,
    label: "Group",
    allowedValues: ["Ground", "Priority", "One Day", "Free"]
  },
  "cost": {
    type: Number,
    label: "Cost",
    decimal: true,
    optional: true
  },
  "handling": {
    type: Number,
    label: "Handling",
    optional: true,
    decimal: true,
    defaultValue: 0,
    min: 0
  },
  "rate": {
    type: Number,
    label: "Rate",
    decimal: true,
    min: 0
  },
  "enabled": {
    type: Boolean,
    label: "Enabled",
    defaultValue: false
  },
  "validRanges": {
    type: Array,
    optional: true,
    label: "Matching Cart Ranges"
  },
  "validRanges.$": {
    type: Object,
    optional: true
  },
  "validRanges.$.begin": {
    type: Number,
    decimal: true,
    label: "Begin",
    optional: true
  },
  "validRanges.$.end": {
    type: Number,
    decimal: true,
    label: "End",
    optional: true
  },
  "validLocales": {
    type: Array,
    optional: true,
    label: "Matching Locales"
  },
  "validLocales.$": {
    type: Object,
    optional: true
  },
  "validLocales.$.origination": {
    type: String,
    label: "From",
    optional: true
  },
  "validLocales.$.destination": {
    type: String,
    label: "To",
    optional: true
  },
  "validLocales.$.deliveryBegin": {
    type: Number,
    label: "Shipping Est.",
    optional: true
  },
  "validLocales.$.deliveryEnd": {
    type: Number,
    label: "Delivery Est.",
    optional: true
  },
  "carrier": {     // kind of denormalizing, useful for having it in shipmentMethod( cart & order)
    type: String,  // Alternatively we can make an extra Schema:ShipmentMethod, that inherits
    optional: true // ShippingMethod and add the optional carrier field
  },
  "settings": {
    type: ShippoShippingMethod,
    optional: true
  }
});

/**
 * ShipmentQuote Schema
 */

export const ShipmentQuote = new mongoose.Schema({
  carrier: {
    type: String
  },
  method: {
    type: ShippingMethod
  },
  rate: {
    type: Number,
    decimal: true,
    defaultValue: "0.00"
  }
});

// populate with order.items that are added to a shipment
export const ShipmentItem = new mongoose.Schema({
  _id: {
    type: String,
    label: "Shipment Line Item",
    optional: true
  },
  productId: {
    type: String,
    index: 1
  },
  shopId: {
    type: String,
    index: 1,
    label: "Shipment Item ShopId",
    optional: true
  },
  quantity: {
    label: "Quantity",
    type: Number,
    min: 0
  },
  variantId: {
    type: String
  }
});

/**
 * ShippingParcel Schema
 */

export const ShippingParcel = new mongoose.Schema({
  containers: {
    type: String,
    optional: true
  },
  length: {
    type: Number,
    optional: true
  },
  width: {
    type: Number,
    optional: true
  },
  height: {
    type: Number,
    optional: true
  },
  weight: {
    type: Number,
    optional: true
  }
});

/**
 * ShippoShipment Schema
 * Specific properties of Shipment for use with Shippo. We don't use
 */

export const ShippoShipment = new mongoose.Schema({
  transactionId: {
    type: String,
    optional: true
  },
  trackingStatusStatus: { // cause tracking_status.status
    type: String,
    optional: true
  },
  trackingStatusDate: {
    type: String,
    optional: true
  }
});


/**
 * Shipment Schema
 * used for cart/order shipment tracking
 */

export const Shipment = new mongoose.Schema({
  _id: {
    type: String,
    label: "Shipment Id"
  },
  paymentId: {
    type: String,
    label: "Payment Id",
    optional: true
  },
  address: {
    type: Address,
    optional: true
  },
  shipmentMethod: {
    type: ShippingMethod,
    optional: true
  },
  shipmentQuotes: {
    type: [ShipmentQuote],
    optional: true
  },
  tracking: {
    type: String,
    optional: true
  },
  parcel: {
    type: ShippingParcel,
    optional: true
  },
  items: {
    type: [ShipmentItem],
    optional: true
  },
  packed: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  shipped: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  delivered: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  invoice: {
    type: Invoice,
    optional: true
  },
  transactions: {
    type: [Object],
    optional: true,
    blackbox: true
  }, // For printable Shipping label
  shippingLabelUrl: {
    type: String,
    optional: true
  }, // For Customs printable label
  customsLabelUrl: {
    type: String,
    optional: true
  }, // shippo specific properties
  shippo: {
    type: ShippoShipment,
    optional: true
  }
});

/**
 * ShippoShippingProvider Schema
 * Specific  properties for use with Shippo. We don't use
 * ShippingProvider service* fields because Shippo is on level
 * higher service than simple carrier's ,e.g Fedex api.
 */

export const ShippoShippingProvider = new mongoose.Schema({
  carrierAccountId: {
    type: String,
    optional: true
  }
});

/**
 * ShippingProvider Schema
 */

export const ShippingProvider = new mongoose.Schema({
  _id: {
    type: String,
    label: "Provider Id",
    optional: true
  },
  name: {
    type: String,
    label: "Service Code",
    optional: true
  },
  label: {
    type: String,
    label: "Public Label"
  },
  enabled: {
    type: Boolean,
    defaultValue: true
  },
  serviceAuth: {
    type: String,
    label: "Auth",
    optional: true
  },
  serviceSecret: {
    type: String,
    label: "Secret",
    optional: true
  },
  serviceUrl: {
    type: String,
    label: "Service URL",
    optional: true
  },
  shippoProvider: {
    type: ShippoShippingProvider,
    optional: true
  }
});

/**
 * Shipping Schema
 */

export const Shipping = new mongoose.Schema({
  _id: {
    type: String,
    label: "Service Id",
    optional: true
  },
  shopId: {
    type: String,
    index: 1,
    label: "Shipping ShopId"
  },
  name: {
    type: String,
    label: "Service Name",
    optional: true,
    index: 1
  },
  provider: {
    type: ShippingProvider,
    label: "Shipping Provider"
  },
  methods: {
    type: [ShippingMethod],
    optional: true,
    label: "Shipping Methods"
  },
  shipmentQuotes: {
    type: [ShipmentQuote],
    optional: true,
    label: "Quoted Methods"
  }
});

