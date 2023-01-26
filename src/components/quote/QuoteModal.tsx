import { Button, Modal } from "antd";

export interface QuoteModalProp {
  open: boolean;
  onCancel: () => void;
  authorLoaded?: boolean;
  quoteLoaded?: boolean;
}

export function QuoteModal(props: QuoteModalProp) {
  const { onCancel, open, authorLoaded, quoteLoaded } = props;
  if (!open) return null;
  return (
    <Modal
      title="Requesting the quote"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button type="primary" key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <p>Step 1: Requesting author...{authorLoaded && " completed"}</p>
      <p>Step 2: Requesting Quote...{quoteLoaded && " completed"}</p>
    </Modal>
  );
}
