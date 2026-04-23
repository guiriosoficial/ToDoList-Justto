import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskItem from '@/components/JusTaskItem.vue'

type Task = {
  id: number
  name: string
  done: boolean
}

const baseTask: Task = {
  id: 1,
  name: 'Test task',
  done: false
}

function mountComponent(props: Partial<{ task: Task; isEditing: boolean }> = {}) {
  return mount(TaskItem, {
    props: {
      task: baseTask,
      ...props
    },
    global: {
      stubs: {
        JusIcon: { template: '<span />' }
      }
    }
  })
}

/**
 * Helper para pegar o primeiro payload emitido com segurança e tipagem
 */
function getFirstEmitted<T>(wrapper: VueWrapper, event: string): T {
  const events = wrapper.emitted(event)

  expect(events).toBeTruthy()
  expect(events!.length).toBeGreaterThan(0)

  return events![0]![0] as T
}

describe('TaskItem', () => {
  it('renders task name', () => {
    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Test task')
  })

  it('emits update-task when checkbox is toggled', async () => {
    const wrapper = mountComponent()

    await wrapper.get('input[type="checkbox"]').setValue(true)

    const payload = getFirstEmitted<Task>(wrapper, 'update-task')

    expect(payload.done).toBe(true)
  })

  it('emits remove-task when clicking remove button', async () => {
    const wrapper = mountComponent()

    await wrapper.get('[aria-label="Remove task"]').trigger('click')

    const payload = getFirstEmitted<number>(wrapper, 'remove-task')

    expect(payload).toBe(1)
  })

  it('emits edit-task with id when clicking edit', async () => {
    const wrapper = mountComponent()

    await wrapper.get('[aria-label="Edit task"]').trigger('click')

    const payload = getFirstEmitted<number>(wrapper, 'edit-task')

    expect(payload).toBe(1)
  })

  it('shows input when isEditing is true', () => {
    const wrapper = mountComponent({ isEditing: true })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('emits edit-task null when canceling edition', async () => {
    const wrapper = mountComponent({ isEditing: true })

    await wrapper.get('[aria-label="Cancel edition"]').trigger('click')

    const payload = getFirstEmitted<null>(wrapper, 'edit-task')

    expect(payload).toBeNull()
  })

  it('emits update-task with trimmed name on confirm', async () => {
    const wrapper = mountComponent({ isEditing: true })

    const input = wrapper.get('input[type="text"]')
    await input.setValue('   Updated Task   ')

    await wrapper.get('[aria-label="Confirm edition"]').trigger('click')

    const payload = getFirstEmitted<Task>(wrapper, 'update-task')

    expect(payload.name).toBe('Updated Task')
  })

  it('does not emit update-task if name is empty', async () => {
    const wrapper = mountComponent({ isEditing: true })

    const input = wrapper.get('input[type="text"]')
    await input.setValue('   ')

    await wrapper.get('[aria-label="Confirm edition"]').trigger('click')

    expect(wrapper.emitted('update-task')).toBeFalsy()
  })

  it('applies done class when task is done', () => {
    const wrapper = mountComponent({
      task: { ...baseTask, done: true }
    })

    expect(wrapper.classes()).toContain('task-item-container--done')
  })
})
