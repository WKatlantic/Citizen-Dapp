import { FunctionComponentElement } from 'react'
import { IconBaseProps } from 'react-icons'

export type Route = {
  /**
   * @desc The name of the router
   * @type String
   */
  name: string

  /**
   * @desc The URL of the router
   * @type String
   */
  url: string

  /**
   * @desc The key of the router
   * @type String
   */
  key: string

  /**
   * @desc The icon of the router
   * @type FunctionComponentElement
   */
  icon: FunctionComponentElement<IconBaseProps>

  /**
   * @desc The existence of the divider
   * @type boolean
   */
  divider: boolean
}
