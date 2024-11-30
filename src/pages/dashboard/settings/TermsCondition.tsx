import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';

const TermsCondition = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        readonly: false,
        placeholder: 'Start typing...',
        style: {
            height: '400px',
            background: 'white',
        },
    };

    return (
        <div className="bg-white px-4 py-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl text-primary font-semibold">Terms and Conditions</h3>
            </div>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                />
            </div>
            <div className="mt-6 flex justify-center">
                <Button
                    style={{
                        height: 40,
                        width: '150px',
                    }}
                    type="primary"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default TermsCondition;
