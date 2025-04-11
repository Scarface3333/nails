import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "../app/services/userApi";
import { Link, useNavigate } from "react-router-dom";

export function RegisterForm({ className,setSelected, ...props }) {
  const [formData, setFormData] = useState({
    fio: "",
    phone: "",
    login: "",
    password: "",
  });
  
  const [registerUser,{isLoading,isError}] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(formData).unwrap();
      console.log("Успешная регистрация:", result);
      setSelected('login')

    } catch (err) {
      console.error("Ошибка при регистрации:", err);
    }
  };

  return (
  
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>
              Введите ваши данные, чтобы создать аккаунт
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="fio">ФИО</Label>
                <Input
                  id="fio"
                  name="fio"
                  type="text"
                  required
                  value={formData.fio}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  name="login"
                  type="text"
                  required
                  value={formData.login}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Зарегистрироваться
              </Button>
              <span
                onClick={() => setSelected('login')}
                className="underline underline-offset-4 cursor-pointer text-blue-500"
              >
                Уже есть аккаунт? Войти
              </span>
              {isError && (
              <div className="text-red-500 text-sm mt-2">
                Ошибка при регистрации.
              </div>
            )}


            </form>
          </CardContent>
        </Card>
      </div>

  );
}
