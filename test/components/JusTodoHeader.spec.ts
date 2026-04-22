import { describe, it, vi, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JusTodoHeader from '@/components/JusTodoHeader.vue'

const mockRoute = {
    meta: {
        headerButtonLink: 'about',
        headerButtonTitle: 'About'
    }
}

vi.mock('vue-router', () => ({
    useRoute: () => mockRoute,
    RouterLink: {
        name: 'RouterLink',
        props: ['to'],
        template: '<a :href="JSON.stringify(to)"><slot /></a>'
    }
}))

describe('JusTodoHeader', () => {
    it('renders counters and route link', () => {
        const wrapper = mount(JusTodoHeader, {
            props: {
                counter: {
                    total: 10,
                    done: 4,
                    doing: 6
                }
            }
        })

        expect(wrapper.text()).toContain('TODO List')
        expect(wrapper.text()).toContain('Total: 10')
        expect(wrapper.text()).toContain('Done: 4')
        expect(wrapper.text()).toContain('Left: 6')
        expect(wrapper.text()).toContain('About')
    })

    it('uses default counter values when none is provided', () => {
        const wrapper = mount(JusTodoHeader)

        expect(wrapper.text()).toContain('Total: 0')
        expect(wrapper.text()).toContain('Done: 0')
        expect(wrapper.text()).toContain('Left: 0')
    })
})
