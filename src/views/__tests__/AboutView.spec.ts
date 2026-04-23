import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

function mountComponent() {
  return mount(AboutView, {
    global: {
      stubs: {
        JusIcon: true,
        RouterLink: {
          template: '<a :href="to"><slot /></a>',
          props: ['to']
        }
      }
    }
  })
}

describe('AboutView', () => {
  it('renders main content', () => {
    const wrapper = mountComponent()

    expect(wrapper.text()).toContain("I'm Guilherme Rios")
    expect(wrapper.text()).toContain('TODO List')
    expect(wrapper.text()).toContain('Yes, I got the job')
  })

  it('renders back link with correct route', () => {
    const wrapper = mountComponent()

    const link = wrapper.get('.about-container__link')

    expect(link.attributes('href')).toBe('/')
    expect(link.text()).toContain('Back')
  })

  it('renders external github link correctly', () => {
    const wrapper = mountComponent()

    const githubLink = wrapper.get('a[href="https://github.com/guiriosoficial"]')

    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.text()).toBe('guiriosoficial')
  })

  it('renders JusIcon inside back link', () => {
    const wrapper = mountComponent()

    expect(wrapper.findComponent({ name: 'JusIcon' }).exists()).toBe(true)
  })
})
