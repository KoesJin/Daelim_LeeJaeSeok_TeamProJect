import React from 'react';

const PlusIcon = () => {
    return (
        <div style={{ position: 'relative', width: 30, height: 30 }}>
            {/* 세로 막대 */}
            <div
                style={{
                    width: 3,
                    height: 28.5,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 10,
                    background: '#30a04d',
                }}
            />
            {/* 가로 막대 */}
            <div
                style={{
                    width: 28.5,
                    height: 3,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 10,
                    background: '#30a04d',
                }}
            />
        </div>
    );
};

export default PlusIcon;
