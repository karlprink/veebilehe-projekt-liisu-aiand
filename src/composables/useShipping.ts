import { computed, ref, type Ref } from 'vue'
import { shippingPrices } from '../data/shipping'
import type { DeliveryMethod } from '../types'

export function useShipping(cartTotal: Ref<number>, cartCount: Ref<number>) {
  const delivery = ref<DeliveryMethod>('parcel-locker')
  const parcelLockerCost = computed(() =>
    cartTotal.value >= shippingPrices.freeParcelLockerThreshold ? 0 : shippingPrices.parcelLocker,
  )
  const shippingCost = computed(() => {
    if (!cartCount.value) return 0
    return delivery.value === 'parcel-locker' ? parcelLockerCost.value : shippingPrices.courier
  })
  const cartGrandTotal = computed(() => cartTotal.value + shippingCost.value)

  return { delivery, parcelLockerCost, shippingCost, cartGrandTotal }
}
