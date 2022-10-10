import { RootStackParamList } from "./PageTabScreen";

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }