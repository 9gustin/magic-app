import { Badge } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { GlobalModal } from "./modals/config"

export const BecomeProChip = ({}) => {
  return (
    <Badge
      sx={{ cursor: "pointer" }}
      onClick={() =>
        openContextModal({
          modal: GlobalModal.becomePro,
          title: "Get PRO Plan",
          innerProps: {},
        })
      }
    >
      Become pro
    </Badge>
  )
}
