"use client";

import * as AC from "@bacons/apple-colors";
import { ScrollViewProps } from "react-native";
import Animated from "react-native-reanimated";

export function BodyScrollView(
  props: ScrollViewProps & { ref?: React.Ref<Animated.ScrollView> }
) {
  return (
    <Animated.ScrollView
      scrollToOverflowEnabled
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      {...props}
      style={[{ backgroundColor: AC.systemGroupedBackground }, props.style]}
    />
  );
}
