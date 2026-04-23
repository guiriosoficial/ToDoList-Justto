import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoHeader from '@/components/JusTodoHeader.vue'

// 👇 mock do vue-router
vi.mock('vue-router', () => ({
  useRoute: () => ({
    meta: {
      headerButtonLink: 'about',
      headerButtonTitle: 'About'
    }
  })
}))

describe('TodoHeader', () => {
  function mountComponent(props = {}) {
    return mount(TodoHeader, {
      props,
      global: {
        stubs: {
          JusToggleTheme: true,
          RouterLink: {
            template: '<a><slot /></a>',
            props: ['to']
          }
        }
      }
    })
  }

  it('renders default counter values when no props are provided', () => {
    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Total: 0')
    expect(wrapper.text()).toContain('Done: 0')
    expect(wrapper.text()).toContain('Left: 0')
  })

  it('renders counter values from props', () => {
    const wrapper = mountComponent({
      counter: {
        total: 10,
        done: 4,
        doing: 6
      }
    })

    expect(wrapper.text()).toContain('Total: 10')
    expect(wrapper.text()).toContain('Done: 4')
    expect(wrapper.text()).toContain('Left: 6')
  })

  it('renders route link with correct text', () => {
    const wrapper = mountComponent()

    expect(wrapper.get('a').text()).toBe('About')
  })

  it('sets correct aria-label on the link', () => {
    const wrapper = mountComponent()

    const link = wrapper.get('a')

    expect(link.attributes('aria-label'))
      .toBe('Go to About page')
  })

  it('renders toggle theme component', () => {
    const wrapper = mountComponent()

    expect(wrapper.findComponent({ name: 'JusToggleTheme' }).exists())
      .toBe(true)
  })
})
