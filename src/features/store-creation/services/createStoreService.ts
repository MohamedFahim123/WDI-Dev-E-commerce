export type SubmitPayload = {
  storeInfo: unknown;
  addressInfo: unknown;
  kycInfo: unknown;
  payoutInfo: unknown;
};

export async function submitStore(payload: SubmitPayload) {
  return new Promise<{ success: boolean; id?: string }>((resolve) => {
    setTimeout(() => resolve({ success: true, id: "STORE-12345" }), 900);
  });
}
