import "./InfoBox.css";

interface Props {
	text: string;
}

export const InfoBox: React.FC<Props> = ({ text }) => {
	return (
		<div className="info-box">{ text }</div>
	);
};
