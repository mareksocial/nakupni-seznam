import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
   const { t } = useTranslation();
   
   return <div>
        {t("notfound")}
    </div>
}

export default NotFound;