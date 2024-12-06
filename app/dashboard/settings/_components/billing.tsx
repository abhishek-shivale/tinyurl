import { Button } from "@/components/ui/button";
import React from "react";

function Billing() {
  return (
    <>
      <Button variant="secondary" className="w-full">
        View Billing History
      </Button>
      <Button variant="outline" className="w-full">
        Update Payment Method
      </Button>
    </>
  );
}

export default Billing;
