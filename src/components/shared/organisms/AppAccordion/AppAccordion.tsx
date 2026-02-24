import React, {
  createContext,
  useContext,
  useState,
} from "react"

type AccordionContextType = {
  activeValue: string | null
  toggle: (value: string) => void
}

const AccordionContext =
  createContext<AccordionContextType | null>(null)

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("Must be used inside AppAccordion")
  }
  return context
}

type AppAccordionProps = {
  children: React.ReactNode
  collapsible?: boolean
}

/* 👇 Define compound interface */
export type AppAccordionCompound = React.FC<AppAccordionProps> & {
  Item: React.FC<any>
  Header: React.FC<any>
  Content: React.FC<any>
}

/* 👇 Function BIASA dulu */
const AppAccordionBase: React.FC<AppAccordionProps> = ({
  children,
  collapsible = true,
}) => {
  const [activeValue, setActiveValue] =
    useState<string | null>(null)

  const toggle = (value: string) => {
    if (collapsible && activeValue === value) {
      setActiveValue(null)
    } else {
      setActiveValue(value)
    }
  }

  return (
    <AccordionContext.Provider value={{ activeValue, toggle }}>
      <div className="border rounded-lg divide-y">
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

/* 👇 Cast di akhir */
const AppAccordion =
  AppAccordionBase as AppAccordionCompound

export default AppAccordion