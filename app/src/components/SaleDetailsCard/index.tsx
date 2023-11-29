import { CardView, CardContainer, ItemContainer, CardTextInfo } from './styles'
import React from 'react'

export function SaleDetailsCard({ details }: any) {
  return (
    <CardContainer>
      <CardView>
        <ItemContainer>
          <CardTextInfo>Parcelas</CardTextInfo>
          <CardTextInfo>{`${details.installment as string}X R$${(
            details.total / details.installment
          ).toFixed(2)}`}</CardTextInfo>
        </ItemContainer>
        <ItemContainer>
          <CardTextInfo>Desconto</CardTextInfo>
          <CardTextInfo>{`R$${
            details.discount.toFixed(2) as string
          }`}</CardTextInfo>
        </ItemContainer>
        <ItemContainer>
          <CardTextInfo>Total</CardTextInfo>
          <CardTextInfo>{`R$${details.total as string}`}</CardTextInfo>
        </ItemContainer>
      </CardView>
    </CardContainer>
  )
}
