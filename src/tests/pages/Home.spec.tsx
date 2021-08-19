import { render, screen } from "@testing-library/react";
import { stripe } from '../../services/stripe'
import { mocked } from 'ts-jest/utils';
import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-priceId', amount: 'R$9,99' }} />)

    expect(screen.getByText('for R$9,99 month')).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const retrievePricesStripeMocked = mocked(stripe.prices.retrieve)

    retrievePricesStripeMocked.mockResolvedValueOnce({
      id: 'fake-priceId',
      unit_amount: 999,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-priceId',
            amount: '$9.99'
          }
        }
      })
    )
  })

})