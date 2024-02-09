import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const PromptModal =
    (props) => {
        const title = props.title || '';
        const message = props.message || '';
        const show = props.show || false;
        const btn=props.buttonText;

        return (
            <Modal isOpen={show} className="prompt-modal-background" >
                 <div className="prompt-modal-content">
                    <div className="prompt-modal-header">
                        {/* {title &&
                            // (<ModalHeader >{title}</ModalHeader>)
                        } */}
                        {title}
                    </div>
                    <div className="prompt-modal-body">  
                        <ModalBody>
                            {message}
                        </ModalBody>
                    </div>
                    <div className="prompt-modal-footer">
                        <ModalFooter>
                            {props.okHandler &&
                                <Button  onClick={props.okHandler} className="modal-ok-button">{btn}</Button>
                            }
                        </ModalFooter>
                    </div>
                </div>
            </Modal>
        );
    };


    export const ConfirmModal =
    (props) => {
        
        const title = props.title || '';
        const message = props.message || '';
        const show = props.show || false;
        const okButtonText = props.okButtonText || 'OK';
        const cancelButtonText = props.cancelButtonText || 'Cancel';

        return (
            <Modal isOpen={show} className="prompt-modal-background">
                <div className="prompt-modal-content">
                <div className="prompt-modal-header">
                    {/* {title &&
                        (<ModalHeader>{title}</ModalHeader>)
                    } */}
                    {title}
                </div>
                <div className="prompt-modal-body">  
                    <ModalBody>
                        {message}
                    </ModalBody>
                </div>
                <div className="prompt-modal-footer">                
                    <ModalFooter>

                        <Button onClick={props.cancelHandler} className="modal-cancel-button">{cancelButtonText}</Button>
                        {' '}
                        {props.okHandler &&
                            <Button onClick={props.okHandler} className="modal-ok-button">{okButtonText}</Button>
                        }

                    </ModalFooter>
                </div>
                </div>
            </Modal>
        );
    };
