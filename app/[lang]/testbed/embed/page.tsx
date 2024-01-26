"use client";

import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function embed() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    // <div>
    //   <iframe
    //     title="Sample Report Demo"
    //     width="1140"
    //     height="541.25"
    //     src="https://playground.powerbi.com/sampleReportEmbed"
    //     frameBorder={0}
    //     allowFullScreen={true}
    //   ></iframe>
    // </div>
    <div>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <iframe
                  title="Sample Report Demo"
                  width="1140"
                  height="541.25"
                  src="http://imcmaster.iptime.org:30001"
                  allowFullScreen={true}
                ></iframe>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
