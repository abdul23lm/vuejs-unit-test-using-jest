import TodoCard from '../../components/TodoCard.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper;
describe('Component: TodoCard', () => {
  it('shows todo data with `del` tag, if todo props isDone true', () => {
    wrapper = shallowMount(TodoCard, {
      stubs: ['router-link'],
      propsData: {
        isDone: true,
        todo: 'memasak',
        todoId: 5
      }
    })

    expect(wrapper.findComponent({ ref: 'delRef' }).exists()).toBeTruthy()
  })

  it('shows todo data without `del` tag, if todo props isDone false', () => {
    wrapper = shallowMount(TodoCard, {
      stubs: ['router-link'],
      propsData: {
        isDone: false,
        todo: 'memasak',
        todoId: 5
      }
    })

    expect(wrapper.findComponent({ ref: 'delRef' }).exists()).toBeFalsy()
  })

  test('router link have correct link to redirect', () => {
    wrapper = shallowMount(TodoCard, {
      stubs: ['router-link'],
      propsData: {
        isDone: false,
        todo: 'memasak',
        todoId: 5
      }
    })

    expect(wrapper.findComponent({ ref: 'linkRef'}).attributes('to')).toBe('/detail/5')
  })
})