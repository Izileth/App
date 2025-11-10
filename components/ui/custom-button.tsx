import { Pressable, Text, PressableProps, StyleProp, ViewStyle } from "react-native";
import { KanjiLoader } from "./kanji-loader";

interface CustomButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
}

export function CustomButton({
  title,
  isLoading,
  className,
  textClassName,
  style,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={isLoading}
      style={style}
      className={`justify-center items-center ${
        isLoading ? 'opacity-70' : ''
      } ${className}`}
    >
      {isLoading ? (
        <KanjiLoader />
      ) : (
        <Text className={`${textClassName}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}