import {
    ChevronDownIcon,
    Icon,
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
  } from "@gluestack-ui/themed";
  
  const SelectComponent = () => (
    <Select width="100%">
      <SelectTrigger variant="outline" size="md">
        <SelectInput />
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="1" value="1" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
  
  export default SelectComponent;
  