export interface ExchangeButtonGroupProps {
  name: string
  icon: JSX.Element
}

export interface ExchangeButtonsProps extends ExchangeButtonGroupProps {
  onclick: (val: string) => void
}
