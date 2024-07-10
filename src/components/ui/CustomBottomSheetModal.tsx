import { View } from "react-native";
import React, { useMemo, forwardRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "./CustomBackdrop";
import { theme } from "@src/styles/theme";

type Ref = BottomSheetModal;

interface Props {
  content: any;
  snapPoints?: any;
}

const CustomBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = props.snapPoints ?? useMemo(() => ["25%", "92%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={CustomBackdrop}
      backgroundStyle={{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: theme.colors.surface,
      }}
    >
      <View>{props.content}</View>
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;
