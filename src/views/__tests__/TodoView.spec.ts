import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TodoView from '@/views/TodoView.vue'
import { LocalStorageKeys } from '@/config/localStorageKeys'

type Task = {
  id: number
  name: string
  done: boolean
}

function mountComponent() {
  return mount(TodoView, {
    global: {
      stubs: {
        JusTaskInput: {
          template: '<button @click="$emit(\'create-task\', \'New Task\')" />'
        },
        JusTaskItem: {
          template: '<div />'
        },
        JusEmptyState: {
          template: '<div data-testid="empty" />'
        },
        JusClearButton: {
          template: '<button data-testid="clear" @click="$emit(\'click\')" />'
        }
      }
    }
  })
}

function getFirstEmitted<T>(
  wrapper: VueWrapper<unknown>,
  event: string
): T {
  const events = wrapper.emitted(event) as unknown[][] | undefined

  expect(events).toBeTruthy()
  expect(events!.length).toBeGreaterThan(0)

  return events![0]![0] as T
}

describe('TodoView', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows empty state when list is empty', () => {
    const wrapper = mountComponent()

    expect(wrapper.find('[data-testid="empty"]').exists()).toBe(true)
  })

  it('creates a task when receiving create-task event', async () => {
    const wrapper = mountComponent()

    await wrapper.get('button').trigger('click')

    expect(wrapper.find('[data-testid="empty"]').exists()).toBe(false)
    expect(wrapper.findAllComponents({ name: 'JusTaskItem' }).length).toBe(1)
  })

  it('emits updated counter when task is created', async () => {
    const wrapper = mountComponent()

    await wrapper.get('button').trigger('click')

    const payload = getFirstEmitted<{ total: number; done: number; doing: number }>(
      wrapper,
      'update-counter'
    )

    expect(payload).toEqual({
      total: 1,
      done: 0,
      doing: 1
    })
  })

  it('removes all tasks when clear button is clicked and confirmed', async () => {
    const wrapper = mountComponent()

    // cria tarefa
    await wrapper.get('button').trigger('click')

    // mock confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    await wrapper.get('[data-testid="clear"]').trigger('click')

    expect(wrapper.find('[data-testid="empty"]').exists()).toBe(true)
  })

  it('does not remove tasks if confirm is false', async () => {
    const wrapper = mountComponent()

    await wrapper.get('button').trigger('click')

    vi.spyOn(window, 'confirm').mockReturnValue(false)

    await wrapper.get('[data-testid="clear"]').trigger('click')

    expect(wrapper.findAllComponents({ name: 'JusTaskItem' }).length).toBe(1)
  })

  it('saves tasks to localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const wrapper = mountComponent()

    await wrapper.get('button').trigger('click')

    expect(setItemSpy).toHaveBeenCalledWith(
      LocalStorageKeys.TODOS,
      expect.stringContaining('New Task')
    )
  })

  it('loads tasks from localStorage on mount', () => {
    const tasks: Task[] = [
      { id: 1, name: 'Saved Task', done: false }
    ]

    localStorage.setItem(LocalStorageKeys.TODOS, JSON.stringify(tasks))

    const wrapper = mountComponent()

    expect(wrapper.findAllComponents({ name: 'JusTaskItem' }).length).toBe(1)
  })
})
