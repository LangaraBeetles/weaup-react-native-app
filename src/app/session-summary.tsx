import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewLevelModal from "@src/components/modals/NewLevelModal";
import { useEffect, useState } from "react";

const SessionSummaryScreen = () => {
  const [levelModalVisible, setLevelModalVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    if (mounted) {
      const showModal = () => setLevelModalVisible(true);
      setTimeout(showModal, 600);
    }
  }, [mounted]);

  return (
    <SafeAreaView>
      <Text>Session Summary Page text</Text>

      {/* TODO: Remove this NewLevelModal reference, this will be moved to a provider */}
      <NewLevelModal
        isVisible={levelModalVisible}
        onClose={() => setLevelModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default SessionSummaryScreen;
