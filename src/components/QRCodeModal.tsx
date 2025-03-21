import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';

const Wrapper = styled.div`
  padding: 20px;
  background: white;
`;

export default function QRCodeModal({ link }: { link: string }) {
  return (
    <Wrapper>
      <QRCodeCanvas value={link} size={200} />
    </Wrapper>
  );
}
