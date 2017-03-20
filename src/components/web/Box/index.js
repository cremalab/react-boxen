import React, { PureComponent, Children } from "react";
import styled from "styled-components";
import BoxProps from "propTypes/Box";
import { propStyle } from "utils/styleHelpers";

const BoxContainer = styled.div`
  ${propStyle("padding", "padding")}
  ${propStyle("background-color", "backgroundColor")}
`;
BoxContainer.displayName = "BoxContainer";

const BoxChildren = styled.div`
  display: flex;
  ${propStyle("flex-direction", "childDirection")}
  ${propStyle("flex-wrap", "childWrap")}
  ${propStyle("margin", "childSpacing", { negate: true, halve: true })}
`;
BoxChildren.displayName = "BoxChildren";

const BoxChild = styled.div`
  ${propStyle("margin", "childSpacing", { halve: true })}
  ${propStyle("flex-grow", "childGrow")}
  ${propStyle("flex-grow", "grow")}
  ${propStyle("flex-shrink", "shrink")}
  ${propStyle("flex-basis", "childIdealWidth")}
  ${props => props.isCompensator ? `margin-top: 0; margin-bottom: 0;` : null}
`;
BoxChild.displayName = "BoxChild";

const ComponentName = "Box";
class Component extends PureComponent {
  render() {
    const {
      align,
      backgroundAttachment,
      backgroundColor,
      backgroundImage,
      backgroundPosition,
      backgroundRepeat,
      borderColor,
      borderRadius,
      borderStyle,
      borderWidth,
      childAlign,
      childDirection,
      childGrow,
      childIdealWidth,
      childJustify,
      childWrap,
      childWrapOrphan,
      children,
      childSpacing,
      grow,
      height,
      opacity,
      padding,
      shrink,
      width,
      ...rest
    } = this.props;

    const styleProps = {
      align,
      backgroundAttachment,
      backgroundColor,
      backgroundImage,
      backgroundPosition,
      backgroundRepeat,
      borderColor,
      borderRadius,
      borderStyle,
      borderWidth,
      childAlign,
      childDirection,
      childGrow,
      childIdealWidth,
      childJustify,
      childWrap,
      childSpacing,
      grow,
      height,
      opacity,
      padding,
      shrink,
      width,
    };

    return (
      <BoxContainer {...styleProps} {...rest}>
        <BoxChildren {...styleProps}>
          {Children.map(children, child => (
            <BoxChild {...styleProps} {...child.props}>{child}</BoxChild>
          ))}
          {childWrapOrphan === "compensate" &&
            children.map(() => <BoxChild {...styleProps} isCompensator />)}
        </BoxChildren>
      </BoxContainer>
    );
  }
}

Component.displayName = ComponentName;
Component.propTypes = BoxProps;
Component.defaultProps = {
  childDirection: "column",
};

export { Component as default };
