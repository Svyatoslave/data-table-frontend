import { type Ref, ref } from "vue";

interface UseDisclosureActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

type UseDisclosureReturn = readonly [Ref<boolean>, UseDisclosureActions];

export const useDisclosure = (
  initialDisclosure = false
): UseDisclosureReturn => {
  const opened = ref<boolean>(initialDisclosure);

  const open = () => {
    opened.value = true;
  };

  const close = () => {
    opened.value = false;
  };

  const toggle = () => {
    opened.value = !opened.value;
  };

  return [opened, { open, close, toggle }];
};
