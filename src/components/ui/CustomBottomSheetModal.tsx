import { View } from "react-native";
import React, { useMemo, forwardRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type Ref = BottomSheetModal;

interface Props {
  content: any;
  snapPoints?: any;
}

const CustomBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = props.snapPoints ?? useMemo(() => ["25%", "95%"], []);

  return (
    <BottomSheetModal ref={ref} index={1} snapPoints={snapPoints}>
      <View>{props.content}</View>
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;
