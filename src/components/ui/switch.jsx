import * as React from 'react'
import { Switch as RadixSwitch } from 'radix-ui'
import './switch.css'

function Switch(props) {
  return (
    <RadixSwitch.Root className="SwitchRoot" {...props}>
      <RadixSwitch.Thumb className="SwitchThumb" />
    </RadixSwitch.Root>
  )
}

export { Switch }
