import type { Ref } from "vue";
import { useRouter } from "vue-router";

import { useDisclosure } from "@/shared/composables";

interface UseFormingProtocolModalReturn {
  openedFormingModal: Ref<boolean>;
  openFormingModal: () => void;
  closeFormingModal: () => void;
  redirectAfterSuccessForming: () => void;
}

export const useFormingProtocolModal = (): UseFormingProtocolModalReturn => {
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure();

  const redirectAfterSuccessForming = () => {
    router.replace("/protocols");
  };

  return {
    openedFormingModal: opened,
    openFormingModal: open,
    closeFormingModal: close,
    redirectAfterSuccessForming,
  };
};
