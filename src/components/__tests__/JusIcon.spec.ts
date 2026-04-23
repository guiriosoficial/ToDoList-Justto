import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JusIcon from '@/components/JusIcon.vue'

describe('JusIcon', () => {
  it('renders FontAwesomeIcon component', () => {
    const wrapper = mount(JusIcon, {
      props: {
        icon: 'trash-alt'
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'FontAwesomeIcon' }).exists()).toBe(true)
  })

  it('passes the correct icon prop to FontAwesomeIcon', () => {
    const wrapper = mount(JusIcon, {
      props: {
        icon: 'trash-alt'
      },
      global: {
        stubs: {
          FontAwesomeIcon: {
            name: 'FontAwesomeIcon',
            template: '<div />',
            props: ['icon']
          }
        }
      }
    })

    const iconComponent = wrapper.getComponent({ name: 'FontAwesomeIcon' })

    expect(iconComponent.props('icon')).toBe('trash-alt')
  })
})
