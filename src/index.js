import React, { Children } from "react"
import BoxProps from "propTypes/Box"
import { propStyle } from "utils/styleHelpers"
import styled from 'styled-components'
import { pick } from 'ramda'

const containerMargin = p =>
  p.childSpacing
    ? propStyle('childSpacing', { negate: true, halve: true })
    : 0

const spacerGrow = p =>
  (p.childGrow && !p.cp.grow && 1)
  || (p => p.cp.grow === true || p.cp['data-grow'] === true ? 1 : p.cp.grow || p.cp['data-grow'] || 0)
  || 0

const spacerShrink = p =>
  (!p.cp.shrink && p.childShrink)
  || (p => p.cp.shrink === true || p.cp['data-shrink'] === true ? 1 : p.cp.shrink || p.cp['data-shrink'] || 0)
  || 0

const spacerPadding = p =>
  p.childSpacing
    ? propStyle('childSpacing', { halve: true })
    : 0

const onlyText = x =>
  x &&
  x.map &&
  x.length &&
  x.map(x =>
    typeof x === 'string' ||
    typeof x === 'number'
  ).indexOf(false) === -1

const Container = styled.div`
  box-sizing:      border-box;
  display:         flex;
  flex-grow:       ${ p => p.grow === true ? 1 : p.grow || 1 };
  flex-shrink:     ${ p => p.shrink === true ? 1 : p.shrink || 1 };
  flex-basis:      ${ p => p.basis      || 'auto' };
  padding:         ${ p => p.padding    || 0      };
  width:           ${ p => p.width      || 'auto' };
  ${ p => p.css }
`
Container.displayName = 'BoxContainer'

const SpacerOffset = styled.div`
  box-sizing:      border-box;
  display:         ${ p => p.display        || 'flex'       };
  flex-grow:       1;
  flex-direction:  ${ p => p.childDirection || 'column'     };
  flex-wrap:       ${ p => p.childWrap      || 'nowrap'     };
  align-items:     ${ p => p.childAlign     || 'stretch'    };
  justify-content: ${ p => p.childJustify   || 'flex-start' };
  margin:          ${ containerMargin };
`
SpacerOffset.displayName = 'BoxSpacerOffset'

const Spacer = styled.div`
  box-sizing:      border-box;
  display:         ${ p => p.childFlex ? 'flex' : 'block' };
  align-self:      ${ p => p.cp.align || p.cp['data-align'] || 'auto' };
  flex-grow:       ${ spacerGrow };
  flex-shrink:     ${ spacerShrink };
  flex-basis:      ${ p => p.cp.basis || p.cp['data-basis'] || p.childBasis || 'auto' };
  padding:         ${ spacerPadding };
  ${ p => p.last ? 'padding-top: 0; padding-bottom: 0;' : null };
  ${ p => (p.cp.scroll || p.cp['data-scroll']) && `
    height: 0;
    overflow: auto;
  `}
`
Spacer.displayName = 'BoxSpacer'

const ComponentName = "Box";
class Component extends React.Component {

  render() {
    const { props, props: { children } } = this
    const propsPruned = pick([
      'align',
      'childSpacing',
      'childGrow',
      'childShrink',
      'grow',
      'shrink',
      'basis',
      'padding',
      'background',
      'width',
      'display',
      'childDirection',
      'childWrap',
      'childAlign',
      'childJustify',
      'childFlex',
      'childBasis',
      'last',
      'cp',
    ])(props)

    const onlyTextChildren = onlyText(children)

    return (
      <Container {...props}>
        <SpacerOffset {...propsPruned}>
          {
            onlyTextChildren
              ? children
              : Children.map(children, Child => {
                  const spacerRef = Child && Child.props && (Child.props.spacerRef || Child.props['data-spacerRef'])
                  return Child
                    ? <Spacer
                        {...propsPruned}
                        cp={{...Child.props}}
                        innerRef={spacerRef}
                        children={Child}
                      />
                    : null
                })
          }
          {
            props.childWrapLastGrow === false
             ? [...Array(10).keys()].map((x, i) =>
                 <Spacer {...propsPruned} key={i} children={null} last />
               )
             : null
          }
        </SpacerOffset>
      </Container>
    )
  }
}

Component.displayName = ComponentName;
Component.defaultProps = {
  cp: {}
}
Component.propTypes = BoxProps;

export { Component as default };
