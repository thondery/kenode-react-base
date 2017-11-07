
import React from 'react'
import renderer from 'react-test-renderer'
import Root from '../src/containers/root'

test('test => Root', () => {
  const component = renderer.create(
    <Root />
  )
  expect(component).toMatchSnapshot()
  expect(component.toJSON().type).toEqual('div')
  expect(component.toJSON().props.className).toEqual('rootWrapper')
  expect(component.toJSON().children).toEqual(['test'])
})