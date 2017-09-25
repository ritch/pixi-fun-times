import React, {Component} from 'react'
import setupStage from './setupStage'

export default class Stage extends Component {
  render() {
    return (
      <div id="stage" ref="stage" />
    )
  }

  componentDidMount() {
    const {height, width, update, setup, backgroundColor} = this.props
    const domElement = this.refs.stage
    const stage = setupStage({height, width, domElement, update, setup, backgroundColor})
  }
}