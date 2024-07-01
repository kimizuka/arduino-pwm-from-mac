import { useEffect, useState } from 'react';
import styles from './index.module.scss';

declare global {
  interface Window {
    electron: {
      onReady: (listener: () => void) => void;
      isReady: () => void;
      sendValue3: (value: number) => void;
      sendValue5: (value: number) => void;
      sendValue6: (value: number) => void;
      sendValue9: (value: number) => void;
      sendValue10: (value: number) => void;
      sendValue11: (value: number) => void;
      sendValue13: (value: number) => void;
    };
  }
}

const pinNumbers = [3, 5, 6, 9, 10, 11, 13];

export default function IndexPage() {
  const [ isReady, setIsReady ] = useState(false);
  const [ levels, setLevels ] = useState(pinNumbers.map(() => 0));

  useEffect(() => {
    window.electron.onReady(() => {
      setIsReady(true);
    });
    window.electron.isReady();
  }, []);

  if (!isReady) {
    return (
      <main className={ styles.loading }>
        <p>Connecting to Arduino</p>
      </main>
    );
  }

  return (
    <main className={ styles.main }>
      <ol>
        {levels.map((level, i) => {
          return (
            <li>
              <label>
                <span>{ String(pinNumbers[i]).padStart(2, '0')}</span>
                <input
                  readOnly
                  value={ level }
                  type="range"
                  min={ 0 }
                  max={ 255 }
                  step={ 1 }
                  onChange={(evt) => {
                    const value = parseInt(evt.target.value, 10);
                    setLevels((prevLevels) => {
                      const newLevels = [ ...prevLevels ];

                      newLevels[i] = value;

                      return newLevels;
                    });

                    window.electron[`sendValue${pinNumbers[i]}`](value);
                  }}
                />
              </label>
            </li>
          )
        })}
      </ol>
    </main>
  );
}