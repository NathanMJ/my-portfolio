import { memo } from 'react';

const FCInfiniteLogos = memo(function FCInfiniteLogos({ logos, times }) {
    const repeatCount = Number(times) > 0 ? Math.max(Number(times), 2) : 2;

    const calcTheYear = (year) => {
        const currentYear = new Date().getFullYear();
        return currentYear - year;
    }

    //TODO: one time left one time right

    return (
        <div className='infinite-container'>
            <div className='infinite-pannel'>
                {/* <p className="top">V</p> */}
                <div className="logos">
                    <div className="logos-track">
                        {[...Array(repeatCount).keys()].map(repetitionIndex => (
                            <div key={`repetition-block-${repetitionIndex}`}>
                                {logos.map((l, logoIndex) => (
                                    <div key={`${repetitionIndex}-${logoIndex}`} className={`logo-item ${(logoIndex + (repetitionIndex * logos.length)) % 2 == 0 ? 'even' : 'odd'}`}>
                                        <img src={l.img} alt="logo" />
                                        <p>{calcTheYear(l.years)}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {/* <p className="bottom">V</p> */}
            </div>
        </div>
    );
});

export default FCInfiniteLogos;