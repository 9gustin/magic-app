import styled from "@emotion/styled"
import { Badge } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { GlobalModal } from "./modals/config"

const SXBadge = styled(Badge)`
  cursor: pointer;
`

export const BecomeProChip = ({}) => {
  return (
    <SXBadge
      onClick={() =>
        openContextModal({
          modal: GlobalModal.becomePro,
          title: "Get PRO Plan",
          innerProps: {},
        })
      }
    >
      Become pro
    </SXBadge>
  )
}
