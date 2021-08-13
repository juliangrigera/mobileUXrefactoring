import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';

function QR() {

	const qrUrl = localStorage.getItem('qrUrl');

	return(
		<QRCode id="QRCode" value={qrUrl}></QRCode>
	)
}
export default QR;