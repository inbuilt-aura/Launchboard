"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Web3 from "web3";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleMetaMaskLogin = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsLoading(true);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        const message = `Login to our app with address ${address}`;
        const signature = await web3.eth.personal.sign(message, address, "");

        const response = await fetch(
          "http://localhost:5000/api/auth/metamask",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ signature, message, address }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          login(data.token);
          router.push("/dashboard");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("MetaMask login error:", error);
        alert("An error occurred during MetaMask login");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Sign in with Google
        </Button>
        <Button
          className="w-full"
          onClick={handleMetaMaskLogin}
          disabled={isLoading}
        >
          Sign in with MetaMask
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
}
