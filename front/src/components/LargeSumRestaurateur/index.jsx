import './index.sass'

export default function LargeSumRestaurateur({ title, value, subtitle }) {
    return (
        <div className="large-sum">
            <p className="large-sum__title">{title}</p>
            <p className="large-sum__value">{value}</p>
            {subtitle && <p className="large-sum__subtitle">{subtitle}</p>}
        </div>
    );
}

