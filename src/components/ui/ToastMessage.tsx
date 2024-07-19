import React, { useEffect, useRef } from "react";

import { Animated, TouchableOpacity } from "react-native";
import Stack from "./Stack";
import Avatar from "./Avatar";
import { Text } from "./typography";
import Divider from "./Divider";
import { theme } from "@src/styles/theme";

const ToastMessage = (props: {
  message: string;
  onHide: () => void;
  actionText: string;
  onActionClick: () => void;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Animated.delay(3000),
      // Animated.timing(opacity, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }),
    ]).start(() => {
      // props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 16,
        marginBottom: 5,
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 10,
        shadowColor: theme.colors.neutral[900],
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Stack gap={20}>
        <TouchableOpacity
          onPress={() => {
            Animated.sequence([
              Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
            ]).start(() => {
              props.onHide();
            });
          }}
        >
          <Stack
            flexDirection="row"
            pt={4}
            gap={16}
            alignItems="center"
            w="90%"
          >
            <Avatar content="M" variant="blue2" />
            <Text>{props.message}</Text>
          </Stack>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={props.onActionClick}>
          <Text
            align="center"
            level="headline"
            style={{ color: theme.colors.secondary[600] }}
          >
            {props.actionText}
          </Text>
        </TouchableOpacity>
      </Stack>
    </Animated.View>
  );
};

export default ToastMessage;
