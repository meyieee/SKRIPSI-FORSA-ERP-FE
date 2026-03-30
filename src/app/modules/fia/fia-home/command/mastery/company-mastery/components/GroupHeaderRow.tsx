type Props = { title: string }
export const GroupHeaderRow = ({title}: Props) => (
  <tr>
    <td colSpan={13} className='fw-bolder text-dark bg-light'>
      {title}
    </td>
  </tr>
)


