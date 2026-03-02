import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BaseText from '.';
import { renderWithProviders } from '@/test/test-utils';

describe('BaseText Component', () => {
  it('renders children correctly', () => {
    renderWithProviders(<BaseText>Hello World</BaseText>)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies default flex="1"', () => {
    renderWithProviders(<BaseText>Flex Test</BaseText>)

    const element = screen.getByText('Flex Test')
    expect(element).toHaveStyle({ flex: '1' })
  })

  it('forwards additional props to Span', () => {
    renderWithProviders(
      <BaseText color="red.500" data-testid="base-text">
        Props Test
      </BaseText>
    )

    const element = screen.getByTestId('base-text')

    expect(element).toBeInTheDocument()
  })
})